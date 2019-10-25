import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
declare var diro_button_config: any;

@Component({
  selector: 'app-address-verification',
  templateUrl: './address-verification.component.html',
  styleUrls: ['./address-verification.component.css']
})
export class AddressVerificationComponent implements OnInit {

  input1: string = "Per Jirstrand";
  warning1: string = "Your Name";
  input2: any = "07030";
  warning2: string = "Your Zipcode";
  input3: any = "palo alto";
  firstSwitch: boolean = false;
  secondSwitch: boolean = false;
  thirdSwitch: boolean = false;

  email: string = "nits.tyagi0@getMaxListeners.com";
  mobile: string = "9045750300";
  mcc: string = "+91";
  zipcode: string = "07030";
  dob: string = "1991-05-14";
  apikey: string = "0015572742fd0470ec30ac9c9477090f";
  category: string = "address";
  mxid: string = "";
  token: string = "";
  fileData: any;
  uploadedFiles = [];
  docArray = [];
  downloadpdf: boolean = false;

  title = 'boaDemo';
  selectedLink = "https://nj.myaccount.pseg.com/";
  linksArray = [
    { value: "https://secure.bankofamerica.com/login/sign-in/signOnV2Screen.go" },
    { value: "https://www.capitalone.com" },
  ]

  constructor(private userService: UserService) {
  }

  ngOnInit() {
  }

  checkpdfvalue() {
    console.log("checking pdf value", this.downloadpdf);
  }

  formSubmit() {
    this.createUser();
  }

  createUser() {
    let data =
    {
      "user_info": {
        "firstname": this.input1,
        "lastname": "Jirstrand",
        "email": this.email,
        "mobile": "9045750300",
        "mcc": "+91",
        "dob": this.dob,
        "zipcode": this.zipcode,
        "publickey": "ghfasghjgfsdhgsdjhgsdafghsjhgdsh"
      },

      "capture": {
        "image_upload": false,
        "warn_case": [
          {
            "keyword": this.input1,
            "present": true,
            "type": "text",
            "message": this.warning1,
            "proceed": this.firstSwitch
          },

          {
            "keyword": this.input2,
            "present": true,
            "type": "text",
            "message": this.warning2,
            "proceed": this.secondSwitch
          }]
      },
      "coverage": {
        "country_codes": "IN, US",
        "direct_link": this.selectedLink,
        "category": this.category,
        "lang_code": "en",
        "allow_search": false
      },
      "org_info": {
        "apikey": this.apikey,
        "publickey": "ghfasghjgfsdhgsdjhgsdafghsjhgdsh"
      }
    }

    console.log("this.download pdf ************************* above ", this.downloadpdf);
    diro_button_config(data, (data: any) => {
      console.log("diro config response", data);
      console.log("this.downloadpdf", this.downloadpdf);
      if (!data.errmsg) {
        if (this.downloadpdf) {
          var createUserJson = {
            "firstname": this.input1,
            "lastname": this.input2, "email": this.email,
            "mcc": this.mcc, "mobile": this.mobile, "dob": this.dob,
            "zipcode": this.zipcode, "apikey": this.apikey, "category": this.category,
            "keyname": this.guid()
          };
          this.userService.createUser(createUserJson)
            .subscribe(response => {
              console.log("user created", response);
              this.mxid = response.body.mxid;
              this.token = response.headers.get('Authorization');
              localStorage.setItem("saveToken", this.token);
              let jdata = { "mxid": this.mxid }
              this.userService.getUserKycInfo(jdata).subscribe(response => {
                this.fileData = response.kycDoc;
                this.docArray = [];
                this.docArray.push(this.fileData.files[this.fileData.files.length - 1]);
                console.log('docArray', this.docArray);
                let usermx = this.mxid;
                this.token = localStorage.getItem("saveToken");
                let sendData = { "mxid": usermx, "files": this.docArray };
                if (this.token.split(" ")[0] != "Bearer") {
                  sendData['token'] = this.token;
                }
                let d = JSON.stringify(sendData);
                this.userService.downloadDocument(d).subscribe(response => {
                  console.log("download document response", response);
                  if (response.error == false) {
                    var splitFilename = response.filename.split(".");
                    var type = splitFilename[splitFilename.length - 1];
                    var base64 = response.base64;
                    var dlnk = document.getElementById('dlink');
                    var pdf = 'data:application/' + type + ';base64,' + base64;
                    var contentType = 'application/' + type;
                    console.log("contentType: " + contentType);
                    let blob = this.userService.convertBase64toBlob(base64, contentType);
                    var url = URL.createObjectURL(blob);
                    var a = document.createElement('a');
                    a.setAttribute('style', 'display: none');
                    document.body.appendChild(a);
                    a.href = url;
                    a.download = response.filename;
                    a.click();
                    window.URL.revokeObjectURL(url);
                    console.log("anchor clicked");
                    a.remove();
                  }
                  else {
                    console.log("error while downloading file");
                  }
                }, error => {
                  console.log("download document error", error);
                  alert("Something went wrong, please refresh");
                })

              }, error => {
                console.log("get user kyc info error ", error);
                alert("something went wrong");
              }
              )
            }, error => {
              console.log(error, "create user error **************");
              alert("Error in creating user");
            }
            );
        }
      }
    })
  }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

}
