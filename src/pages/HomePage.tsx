import {
  Backdrop,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  TextField,
} from "@mui/material";
import DownloadImage from "../assets/images/download.png";
import React, {
  ChangeEventHandler,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { Root } from "../extras/types";
import { ColorContext } from "../extras/ColorContext";
import FeatureIntro from "../components/FeatureIntro";

const API_BASE_URL = `https://appnor-backend.onrender.com/extras/v1/api/youtube/insta-video-download?videoUrl=`;
var static_video_url = "";

const sampleResponse: Root = {
  message: "success",
  data: [
    {
      thumbnail_link:
        "https://igcdn.xyz/?token=ce0191f1f7cebe95da1bc202edb87c89706e06f709d56b52dee81b8ef4d6383d&time=1704655365&file=https%3a%2f%2fscontent.cdninstagram.com%2fv%2ft51.2885-15%2f411523980_1489306288282324_4087734257705364979_n.jpg%3fstp%3ddst-jpg_e15%26_nc_ht%3dscontent-hkg1-2.cdninstagram.com%26_nc_cat%3d104%26_nc_ohc%3d6opf4lsz-B8AX8JcxbC%26edm%3dAP_V10EBAAAA%26ccb%3d7-5%26oh%3d00_AfD9i6r0nULo-axfJPs4jftxkXt3LeCecgoocRLmIX57kw%26oe%3d659C7283%26_nc_sid%3d2999b8",
      download_link:
        "https://download.i-7-cdn.xyz/ig/1704653565/e5663c71f9d68ddd8826f829ce9c45dc98d6060ce311bb298aaf740a1ea35449?file=aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3YvdDY2LjMwMTAwLTE2LzEyMDQyODkwMl85MDI2MDgxNTgxNjAyMzNfNzkzMzg1NzAxMDA5MjQ3NzEzOF9uLm1wND9fbmNfaHQ9c2NvbnRlbnQtaGtnMS0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDkmX25jX29oYz1hc092M2hjSUhfNEFYLXVwTmlmJmVkbT1BUF9WMTBFQkFBQUEmY2NiPTctNSZvaD0wMF9BZkFuNnRmV3VjZ29SejJDVEhXWXZvVjYxbjRBSTBRanpGcWNLRFVUM1hqeHJBJm9lPTY1OUM4ODlGJl9uY19zaWQ9Mjk5OWI4Jm5hbWU9U2F2ZUlHLkFwcF8zMjU5NTczMzk2MjIyNDQ5OTkyLm1wNA",
    },
    {
      thumbnail_link:
        "https://igcdn.xyz/?token=ce0191f1f7cebe95da1bc202edb87c89706e06f709d56b52dee81b8ef4d6383d&time=1704655365&file=https%3a%2f%2fscontent.cdninstagram.com%2fv%2ft51.2885-15%2f411923024_875068620762232_1624715898825897339_n.jpg%3fstp%3ddst-jpg_e15%26_nc_ht%3dscontent-hkg1-2.cdninstagram.com%26_nc_cat%3d104%26_nc_ohc%3d9TACpaqnAFAAX-HKKod%26edm%3dAP_V10EBAAAA%26ccb%3d7-5%26oh%3d00_AfBSG99oJoP4m6a1nkPa5NrWqYjHaQuTvypSuhbB5WuWbg%26oe%3d659CC146%26_nc_sid%3d2999b8",
      download_link:
        "https://ig95.snap-data.xyz/ig/1704653565/e5663c71f9d68ddd8826f829ce9c45dc98d6060ce311bb298aaf740a1ea35449?file=aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3YvdDY2LjMwMTAwLTE2LzEyMTQ3MDIyOV83MDIxODYxMDg3MzY5NDRfNzc5NTU0NDM1MTYwNjM3NDA1MV9uLm1wND9fbmNfaHQ9c2NvbnRlbnQtaGtnNC0xLmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDAmX25jX29oYz1LUVM3T1kwalo4QUFYLU9zNTFRJmVkbT1BUF9WMTBFQkFBQUEmY2NiPTctNSZvaD0wMF9BZkJjUnEwa3dIMEt3Rjh1dkY5T1NaWlhDcy1KcDYxc2VXVzFtLVRNSGZ0Zmh3Jm9lPTY1OUM1QTQwJl9uY19zaWQ9Mjk5OWI4Jm5hbWU9U2F2ZUlHLkFwcF8zMjU5NTczNjQ0Mzk5MjUyNjIzLm1wNA",
    },
    {
      thumbnail_link:
        "https://igcdn.xyz/?token=ce0191f1f7cebe95da1bc202edb87c89706e06f709d56b52dee81b8ef4d6383d&time=1704655365&file=https%3a%2f%2fscontent.cdninstagram.com%2fv%2ft51.2885-15%2f411738923_345839318060583_7840275391780298228_n.jpg%3fstp%3ddst-jpg_e15%26_nc_ht%3dscontent-hkg1-2.cdninstagram.com%26_nc_cat%3d103%26_nc_ohc%3dYP8wwUNoxDoAX_qlxQ-%26edm%3dAP_V10EBAAAA%26ccb%3d7-5%26oh%3d00_AfATbOgzpckXubJJOU-YHqBsD4-Apg0PhopsKeony3kUuw%26oe%3d659C5FD6%26_nc_sid%3d2999b8",
      download_link:
        "https://download.i-10-cdn.xyz/ig/1704653565/e5663c71f9d68ddd8826f829ce9c45dc98d6060ce311bb298aaf740a1ea35449?file=aHR0cHM6Ly9zY29udGVudC5jZG5pbnN0YWdyYW0uY29tL3YvdDY2LjMwMTAwLTE2LzEyMTUzODUzMF8zMzQxNzI5NDkyNzg1MjM4XzEyMTc2ODAxNzk3NDU1ODEzNDhfbi5tcDQ_X25jX2h0PXNjb250ZW50LWhrZzEtMi5jZG5pbnN0YWdyYW0uY29tJl9uY19jYXQ9MTAyJl9uY19vaGM9Ti1lWWY2TWpSd01BWC1MX19mUyZlZG09QVBfVjEwRUJBQUFBJmNjYj03LTUmb2g9MDBfQWZCdmhQcmRVcFREQWt6Z0xGRDNER3c2N3F1NnFyblYzWlNKWnpyc1NkWXFZZyZvZT02NTlDOUVCRSZfbmNfc2lkPTI5OTliOCZuYW1lPVNhdmVJRy5BcHBfMzI1OTU3MzgyNDIyNTkwNzMyOS5tcDQ",
    },
  ],
};

function HomePage(props: any) {
  const colorContex = useContext(ColorContext);
  const scrollRef = useRef<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [inVideoUrl, setInVideoUrl] = useState("");
  const [audioResponse, setAudioResponse] = useState<Root>(sampleResponse);
  const [playVideo, setPlayVideo] = useState(false);
  const [isTermsAggred, setIsTermsAggred] = useState(true);
  const [isDownloadSuccess, setIsDownloadSuccess] = useState(false);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    scrollToDiv();
    return () => {};
  }, [colorContex.point]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): any {
    setVideoUrl(event.target.value);
    console.log(event.target.value);
    console.info(videoUrl);
    if (videoUrl !== "" || videoUrl.includes("youtu")) {
      //setPlayVideo(true);
    } else {
      setPlayVideo(false);
    }
  }

  function mimicDownload() {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.includes("instagram")) {
      alert("A Valid Facebook Video URL is Required!!");
      return;
    }

    handleOpen();
    setAudioResponse(sampleResponse);
    setIsDownloadSuccess(true);
    setPlayVideo(true);
    static_video_url = videoUrl;
    setInVideoUrl(audioResponse.data[0].download_link);
    setTimeout(() => {
      handleClose();
      setVideoUrl("");
    }, 5000);
  }

  function handleCheckboxChange(checked: boolean) {
    setIsTermsAggred(checked);
    //setPlayVideo(checked);
  }

  function fetchDownloadableLink(): void {
    if (!isTermsAggred) {
      alert("Please Agree with our Terms & Condition before procedding..");
      return;
    }

    if (videoUrl === "" || !videoUrl.includes("instagram")) {
      alert("A Valid Instagram Video URL is Required!!");
      return;
    }
    handleOpen();
    axios.post<Root>(API_BASE_URL + videoUrl).then(
      (result) => {
        console.log("Hitting Instagram Download API is successful");
        setAudioResponse(result.data);
        setIsDownloadSuccess(true);
        setInVideoUrl(result.data.data[0].download_link);
        setPlayVideo(true);
        setTimeout(() => {
          handleClose();
          setVideoUrl("");
        }, 3000);
      },
      (error) => {
        console.log("Something went wrong while hitting data.." + error);
        handleClose();
        alert("Something went wrong while hitting data.." + error);
      }
    );
  }

  function handleVideoPlay(): any {
    if (inVideoUrl === "") {
      alert("You need to download first to play Instagram videos..");
      return;
    }
    if (videoUrl === "" || !videoUrl.includes("instagram")) {
      alert("A Valid Instagram Video URL is Required!!");
      return;
    }
    static_video_url = videoUrl;
    setPlayVideo(true);
  }

  function openLink(audioUrl: string): any {
    if (audioUrl === "" || audioUrl.length < 20) {
      alert("Something went wrong while generating download link, try again..");
      return;
    }
    window.open(audioUrl, "_blank");
  }

  function scrollToDiv() {
    if (colorContex.point !== 0) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
      colorContex.setPoint(0);
    }
  }

  const backdrop = (
    <React.Fragment>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <h1 className="font-extrabold m-2 text-white text-xl">
            Communicating with server...
          </h1>
        </div>
      </Backdrop>
    </React.Fragment>
  );

  return (
    <div
      ref={scrollRef}
      className="md:m-10 sm:m-5 flex flex-col items-center justify-center"
    >
      {backdrop}
      <FeatureIntro
        heading="Supercharged Instagram Reels Downloader⚡️"
        desc="Imagine a world where your favorite online media is yours to keep, not just to stream. With our tool, that world is real! Download high-quality videos, audio, reels, and even thumbnails – all from a single link, completely FREE!"
        subheading="But it's not just about convenience – it's about freedom. Break free from limited playlists, buffering woes, and the ever-changing algorithms. Save your must-watch content for offline enjoyment. ➡️"
      />
      <div className="flex flex-col items-center border border-gray-500 shadow-lg p-4">
        <TextField
          fullWidth
          value={videoUrl}
          onChange={handleChange}
          id="url-input"
          label="Enter or Paste Instagram Reel Link Here"
          variant="outlined"
        />
        <Button
          onClick={fetchDownloadableLink}
          sx={{ marginTop: "20px", marginBottom: "10px", width: "200px" }}
          variant="contained"
        >
          Download Video
        </Button>
        <Button
          onClick={handleVideoPlay}
          sx={{ width: "200px", marginTop: "10px", marginBottom: "15px" }}
          variant="outlined"
        >
          Play Video
        </Button>
        <h3 className="text-xs text-center w-80 m-2 p-2">
          A direct prompt to download video will get triggered if video has only
          one format else a list of downloadable video will get presented.
        </h3>

        <div className="flex items-center justify-center p-2">
          <Checkbox
            onChange={(e) => handleCheckboxChange(e.target.checked)}
            defaultChecked
          />
          <h3 className="text-xs text-center m-2">
            By downloading video you agree to our terms & conditions for fair
            usages policy
          </h3>
        </div>
        <Divider color="black" />
      </div>

      <br />
      <br />
      {isDownloadSuccess && (
        <div className="border-2 text-center border-blue-500 shadow-sm p-4">
          <div className="flex flex-col items-center md:flex-row font-mono mb-5 justify-center">
            <h3 className="font-bold text-xl">Video Fetching Successful</h3>
            <img
              className="m-2"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
            <img
              className="animate-ping"
              width="30px"
              height="30px"
              alt="download"
              src={DownloadImage}
            />
          </div>

          {audioResponse.data.map((format, index) => {
            return (
              <Button
                sx={{ margin: "10px", color: "blue", fontWeight: "bold" }}
                key={index}
                variant="outlined"
                onClick={() => openLink(format.download_link)}
              >
                Download Video Quality [{index + 1}]
                {audioResponse.data.length === 1 && " [HD+]"}
              </Button>
            );
          })}
        </div>
      )}

      {playVideo && (
        <div className="w-full sm:w-50px lg:w-1/2 mt-10 mb-10">
          <ReactPlayer
            width="100%"
            loop={true}
            controls={true}
            pip={true}
            volume={1}
            url={inVideoUrl}
          />
        </div>
      )}

      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default HomePage;
