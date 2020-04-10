import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { TextToSpeech } from '@ionic-native/text-to-speech';
import { Screenshot } from '@ionic-native/screenshot';
import { Toast } from '@ionic-native/toast';
import { CardIO } from '@ionic-native/card-io';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Crop } from '@ionic-native/crop';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  text:any;
  format:any;
  constructor(public navCtrl: NavController, private bcs:BarcodeScanner, private tts:TextToSpeech, private scr:Screenshot, private toast
    :Toast, private cardIO: CardIO, private photoViewer: PhotoViewer, private crop: Crop, private camera:Camera) {

  }
  readBarcode(){
    this.bcs.scan().then((barcodeData)=>{
      this.text=barcodeData.text;
      this.format=barcodeData.format;
      this.toast.show("Don reading barcode","2000","bottom")
        .subscribe();
    });
  }
  Speak(){
    this.tts.speak("This is a voice from Ionic native.").then(()=>{
      console.log("success");
      this.toast.show("Done speaking","2000","center")
        .subscribe();
    });
  }

  capture(){
    this.scr.save('jpg',80,'captured.jpg')
      .then(
        (result)=>{
        this.toast.show("Capture success","2000","top")
          .subscribe(); 
        },
        (result)=>{
        this.toast.show("Capture error","2000","bottom")
          .subscribe();
    });
  }

  CardIO(){
    this.cardIO.canScan()
  .then(
    (res: boolean) => {
      if(res){
        let options = {
          requireExpiry: true,
          requireCVV: false,
          requirePostalCode: false
        };
        this.cardIO.scan(options);
      }
    }
  );
  }

  PhotoViewer(){
    this.photoViewer.show('https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Gatto_europeo4.jpg/1200px-Gatto_europeo4.jpg');
  }
  Camera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    });
  }
  
  Crop(){
    this.crop.crop('path/to/14.jpg', {quality: 75})
  .then(
    newImage => console.log('new image path is: ' + newImage),
    error => console.error('Error cropping image', error)
  );
  }
}
