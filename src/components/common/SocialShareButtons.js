import { TwitterShareButton, TwitterIcon } from 'react-share';

export default function SocialSharebuttons() {
  const tweetText =
    'I ate a full rainbow today! Check out Eat a Rainbow to log your colorful food';

  return (
    <TwitterShareButton
      url={'https://www.example.com'}
      title={tweetText}
      hashtag='#eattherainbow#healthyfood'
    >
        
      <TwitterIcon size={32} round />
    </TwitterShareButton>
  );
}
