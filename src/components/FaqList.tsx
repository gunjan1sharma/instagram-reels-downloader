import FaqComponent from "./FaqComponent";

function FaqList(props: any) {
  return (
    <div className="p-4 mt-20 lg:mx-20">
      <h1>FAQ (How it works)</h1>
      <div
        className="mt-3 mb-3"
        style={{ borderBottomWidth: "1px", borderBottomColor: "lightgray" }}
      />
      <FaqComponent
        faq="Which platforms can I download content from?"
        answer="We currently support downloads from popular platforms like YouTube, Facebook, Instagram, TikTok, Vimeo, Dailymotion, and many more. Check our website for the full list!"
      />
      <FaqComponent
        faq="What formats can I download in?"
        answer="You can choose from various formats like MP4, MP3, M4A, WebM, and more, depending on the original content and platform. We usually offer the highest available quality."
      />
      <FaqComponent
        faq="Is downloading copyrighted content legal?"
        answer="We encourage responsible usage and downloading content you have the right to access. Downloading copyrighted content without permission is illegal and could have consequences. Please respect copyright laws!"
      />
      <FaqComponent
        faq="Is there a limit on how much I can download?"
        answer="We offer a generous daily and monthly download allowance for free users. We also have affordable premium plans with higher limits."
      />
      <FaqComponent
        faq="Can I download private or age-restricted content?"
        answer="Our service respects platform restrictions and will not allow downloads of private or age-restricted content."
      />
      <FaqComponent
        faq="Is my data safe when using your service?"
        answer="We prioritize user privacy and security. We encrypt connections and do not store any personal information like download history."
      />
      <FaqComponent
        faq="What happens if my download fails?"
        answer="Some platform restrictions or internet issues might cause occasional download failures. We recommend trying again later or contacting us for support."
      />
      <FaqComponent
        faq="Are there any plans to add new features?"
        answer="We're always working on improving our service! We regularly update it with new features and platform support based on user feedback."
      />
    </div>
  );
}

export default FaqList;
