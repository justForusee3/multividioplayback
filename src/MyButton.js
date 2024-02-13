import { Lightning } from "@lightningjs/sdk";

export class MyButton extends Lightning.Component {
  static _template() {
    return {
      w: 250,
      h: 350,
      
      y: 100,
      Image: {
        x: 5,
        w: w => w,
        h: h => h - 50,
      },
    };
  }

  _init() {
    // Access the item property to get the videoUrl
    const videoUrl = this.item && this.item.videoUrl ? this.item.videoUrl : null;
  
    // Check if videoUrl is valid
    if (videoUrl) {
      // Load the video or perform any other actions
      console.log(`Clicked Video URL: ${videoUrl}`);
      // ... rest of the code
    } else {
      console.log(`Selected item does not have a valid videoUrl.`);
    }
  }
  
  


  set item(obj) {
    const { label, src, videoUrl } = obj;
    this._videoUrl = videoUrl;
    this.patch({
      Image: { src, videoUrl },
    });
  }

  setFocus(isFocused) {
    if (isFocused) {
      this._focus();
    } else {
      this._unfocus();
    }
  }
  
  _handleEnter() {
    // Log the entire item object
    console.log('Item:', this.item);
  
    // Log the videoUrl before firing the event
    console.log('Clicked Video URL:', this._videoUrl);
  
    // Fire the event
    this.fireAncestors('$onItemSelect', {
      videoUrl: this._videoUrl,
    });
  }
  
  _focus() {
    console.log('Button Focus');
    this.patch({
      smooth: { color: 0xff005500, scale: 1.1 },
      shader: { type: Lightning.shaders.Outline, stroke: 1.1, color: 0xff09f676 },
    });
  }


  _unfocus() {
    console.log('Button Unfocus');
    this.patch({
      smooth: { color: 0xffffffff, scale: 1.0 },
      shader: { type: Lightning.shaders.Outline, stroke: 0, color: 0x0000000 },
    });
  }
}