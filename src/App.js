import { Lightning, Utils, Log } from "@lightningjs/sdk";
import { Device } from "@firebolt-js/sdk";
import { MyButton } from "./MyButton";

export class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _template() {
    return {
      HelloWorld: {
        w: 1920,
        h: 1080,
        y: 0,
        rect: true,
        // color: 0xff000000,
        src: Utils.asset("images/pp.png"),

        FireboltStatus: {
          Rdklogo: {
            x: 70,
            y: 50,
            w: 300,
            h: 65,
            zIndex: 10,
            // shadowColor: 0xffff00ff,
            src: Utils.asset("images/RDK-Logo-web.webp"),
          },
          Alexalogo: {
            x: 1050,
            y: 5,
            w: 170,
            h: 150,
            src: Utils.asset("images/alexa.png"),
          },

          Trailer: {
            x: 120,
            y: 385,
            w: 100,
            h: 100,
            //color: 0xffff00ff,
            src: Utils.asset("images/facebook.png"),
          },

          Watchparty: {
            x: 480,
            y: 385,
            w: 90,
            h: 90,

            src: Utils.asset("images/share.png"),
          },

          Bookmark: {

            x: 300,
            y: 385,
            w: 100,
            h: 90,
            src: Utils.asset("images/bookmark.png"),
          },

          Info: {
            x: 650,
            y: 380,
            w: 100,
            h: 100,
            src: Utils.asset("images/info.png"),
          },

          Belllogo: {
            x: 1285
            ,
            y: 30,
            w: 90,
            h: 90,
            src: Utils.asset("images/sett.png"),
          },
          Notifilogo: {
            x: 1450,
            y: 30,
            w: 100,
            h: 100,
            src: Utils.asset("images/noti.png"),
          },
          CurrentTime: {
            mountX: 0.5,
            x: 1700,
            y: 40,
            w: 200,
            h: 100, // Adjust the Y position as needed
            text: {
              text: "",
              fontFace: "Regular",
              fontSize: 70,
              //textColor: 0xff09f676,
            },
          },
          Text1: {

            x: 100,
            y: 610,
            w: 500,
            h: 80,
            text: {
              text: "Featured Video on Demand",
              fontFace: "Regular",
              fontSize: 30,
              //textColor: 0xff09f676,
            }
          },

          Device: {
            mountX: 0.5,
            x: 960,
            y: 1030,
            text: {
              // text: "Device not Ready!",
              fontFace: "Regular",
              fontSize: 24,
              //textColor: 0xff09f676,
            },
          },
        },
        Playbutton: {
          type: MyButton,
          mount: -0.2,
          x: 115,
          y: 130,
          text: {
            //text: "Recent",
            fontFace: "Regular",
            fontSize: 45,
            textColor: 0xffffffff,
          },
          signals: {
            onClick: "$onItemSelect",
          },
        },
      },
      Slider: {
        w: 800,
        h: 350,
        x: 480,
        y: 750,
        mount: 0.5,
        Wrapper: {},
      },
      SecondSlider: {
        w: 800,
        h: 350,
        x: 480,
        y: 750, // Adjust the Y position for the second slider
        mount: 0.5,
        SecondWrapper: {},
      },
      VideoSection: {
        alpha: 1,
        x: 0,
        y: 0,
        w: 1920,
        h: 1080,
        color: "0xff000000",
        rect: true,
        visible: false,
        HelpMsg: {
          x: 80,
          y: 50,
          w: 1920,
          text: {
            text: "Play the Video using AAMP Player",
            fontSize: 40,
            fontFace: "Regular",
            textAlign: "center",
            lineHeight: 50,
          },
          color: "0xffffffff",
          alpha: 1,
        },
        Video: {
          x: 0,
          y: 0,
          w: 1920, // Set to your desired width
          h: 1080, // Set to your desired height
          type: Lightning.components.VideoItem, // Use the appropriate Lightning video
        },
      },
    };
  }

  _getFocused() {
    return this.tag("Playbutton");
  }

  
  _init() {
    this.index = 0;
    this.currentSlider = "slider1";
  
    // Fetch data from the JSON file
    this.url = Utils.asset('data/data.json');
  
    // Fetch the data and create buttons
    fetch(this.url)
      .then(response => response.json())
      .then(data => {
        this.dataLength = data.length; // Set dataLength based on the length of the data array
        this.setItems(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle exceptions or perform additional actions here
      });
      this._updateCurrentTime();
  
    // Update the time every second (1000 milliseconds)
    setInterval(() => {
      this._updateCurrentTime();
    }, 1000);
  }
  

  // setItems(data) {
  //   const sliderButtons = [];
  
  //   data.forEach((item, i) => {
  //     const imageSrc = Utils.asset(item.src);
  
  //     // Check if the image source is valid
  //     if (imageSrc) {
  //       sliderButtons.push({
  //         type: MyButton,
  //         x: i * (300 + 10),
  //         item: {  // Make sure 'item' property is correctly set
  //           label: item.label,
  //           src: Utils.asset(item.src),
  //           videoUrl: item.videoUrl,
  //         },
  //       });
  //     } else {
  //       // Log an error message for invalid image source
  //       console.error(`Invalid image source for item ${i}: ${item.src}`);
  //     }
  //   });
  
  //   // Update the children with the valid slider buttons
  //   this.tag("Wrapper").children = sliderButtons;
  // }

  // fresh

  setItems(data) {
    const sliderButtons = [];
    data.forEach((item, i) => {
      sliderButtons.push({
        type: MyButton,
        x: i * (300 + 10),
        item: {
          label: item.label,
          src: Utils.asset(item.src),
          videoUrl: item.videoUrl,
        },
      });
    });
  
    this.tag("Wrapper").children = sliderButtons;
  }
  

  _setSliderFocus() {
    if (this.currentSlider === "slider1") {
      this.tag("Wrapper").setSmooth("alpha", 1);
      this.tag("SecondWrapper").setSmooth("alpha", 1);
      this.tag("Wrapper").children[this.index].setFocus(true);
    } else if (this.currentSlider === "slider2") {
      this.tag("Wrapper").setSmooth("alpha", 1);
      this.tag("SecondWrapper").setSmooth("alpha", 1);
      this.tag("SecondWrapper").children[this.index].setFocus(true);
    }
  }

  // $onItemSelect(obj) {
  //   const url =
  //     "https://media.axprod.net/TestVectors/v9-MultiFormat/Clear/Manifest_1080p.m3u8";
  //   this._player = new AAMPMediaPlayer();
  //   this._player.load(url);
  //   this._setState("VideoPlay");
  // }

  $onItemSelect(obj) {
    console.log("Selected Item Object:", obj);

    const selectedItem = obj.item; // Assuming the selected item has a 'videoUrl' property in your data.json
    if (selectedItem && selectedItem.videoUrl) {
        const url = selectedItem.videoUrl;
        this._player = new AAMPMediaPlayer();
        this._player.load(url);
        this._setState("VideoPlay");
    } else {
        console.error("Selected item does not have a valid videoUrl.");
    }
}


  _updateCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    this.tag("CurrentTime").text.text = `${formattedTime}`;
  }

  // repositionWrapper() {
  //   const wrapper = this.tag("Wrapper");
  //   const sliderW = this.tag("Slider").w;
  //   const currentWrapperX =
  //     wrapper.transition("x").targetvalue || wrapper.x;
  //   const currentFocus = wrapper.children[this.index];
  //   const currentFocusX = currentFocus.x + currentWrapperX;
  //   const currentFocusOuterWidth =
  //     currentFocus.x + currentFocus.w;

  //   if (currentFocusX < 0) {
  //     wrapper.setSmooth("x", -currentFocus.x);
  //   } else if (currentFocusOuterWidth > sliderW) {
  //     wrapper.setSmooth(
  //       "x",
  //       sliderW - currentFocusOuterWidth
  //     );
  //   }
  // }

  // repositionWrapper() {
  //   const wrapper = this.tag("Wrapper");
  //   const buttonWidth = wrapper.children[0].w; // Assuming all buttons have the same width
  //   const targetX = -this.index * (buttonWidth + 10);
  //   wrapper.setSmooth("x", targetX);
  // }

  // _handleLeft() {
  //   const slider =
  //     this.currentSlider === "slider1"
  //       ? this.tag("Wrapper")
  //       : this.tag("SecondWrapper");
  //   if (this.index > 0) {
  //     this.index--;
  //     slider.children[this.index].setFocus(true);
  //     slider.children[this.index + 1].setFocus(false);
  //   } else if (this.index === 0) {
  //     // If the current index is 0, set focus to the last index
  //     this.index = slider.children.length - 1;
  //     slider.children[0].setFocus(false);
  //     slider.children[this.index].setFocus(true);
  //   }
  // }
  // _handleRight() {
  //   const slider =
  //     this.currentSlider === "slider1"
  //       ? this.tag("Wrapper")
  //       : this.tag("SecondWrapper");
  //   if (this.index < this.dataLength - 1) {
  //     this.index++;
  //     slider.children[this.index].setFocus(true);
  //     slider.children[this.index - 1].setFocus(false);
  //   } else if (this.index === this.dataLength - 1) {
  //     // If the current index is the last index, set focus to the 0th index
  //     this.index = 0;
  //     slider.children[this.dataLength - 1].setFocus(false);
  //     slider.children[0].setFocus(true);
  //   }
  // }

  _handleLeft() {
    this.index = (this.index - 1 + this.dataLength) % this.dataLength;
    this._repositionWrapper();
}

_handleRight() {
    this.index = (this.index + 1) % this.dataLength;
    this._repositionWrapper();
}

_repositionWrapper() {
  const wrapper = this.tag("Wrapper");
  const buttonWidth = wrapper.children[0].w; // Assuming all buttons have the same width
  const targetX = -this.index * (buttonWidth + 10);
  wrapper.setSmooth("x", targetX);

  // Set focus on the current index
  wrapper.children.forEach((button, i) => {
      button.setFocus(i === this.index);
  });
}

  _getSliderFocused() {
    return this.tag("Slider.Wrapper").children[this.index];
  }

  static _states() {
    return [
      class LaunchView extends this {
        _getFocused() {
          return this.tag("Playbutton");
        }
      },
      class SecondSliderState extends this {
        _getFocused() {
          if (this.currentSlider === "slider1") {
            return this.tag("Slider.Wrapper").children[this.index];
          } else {
            return this.tag("SecondSlider.SecondWrapper").children[this.index];
          }
        }
      },
      class VideoPlay extends this {
        _getFocused() {
          return this.tag("Video");
        }
        $enter() {
          this.tag("Video").visible = true;
          this.tag("HelloWorld").visible = false;
          this.tag("Slider").visible = false;
          this.tag("SecondSlider").visible = false;
        }
        _handleBack() {
          console.log("back to launchView");
          this.tag("Video").visible = false;

          this.tag("HelloWorld").visible = true;
          this.tag("Slider").visible = true;
          this.tag("SecondSlider").visible = true;

          this._setState("LaunchView");
          if (this._player) {
            this._player.stop();
            this._player = null;
          }
        }
      },
    ];
  }

  _active() {
    console.log("active set state to launchView");
    this._setState("LaunchView");

    Device.version().then((version) => {
      const deviceVersion =
        "version:" +
        version.sdk.readable +
        " : v" +
        version.sdk.major +
        "." +
        version.sdk.minor +
        "." +
        version.sdk.patch;
      Log.info(deviceVersion);
      this.tag("Device").text.text += deviceVersion;
    });
  }
}
