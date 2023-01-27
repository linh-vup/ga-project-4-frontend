import { TwitterShareButton, TwitterIcon } from 'react-share';

export default function SocialSharebuttons() {
  const tweetText =
    'I ate a full rainbow today! Check out A Rainbow a Day to log your colorful food today';

  return (
    <TwitterShareButton
      url={'https://a-rainbow-a-day.netlify.app/'}
      title={tweetText}
      hashtag='#eattherainbow#healthyfood'
    >
        
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  );
}
