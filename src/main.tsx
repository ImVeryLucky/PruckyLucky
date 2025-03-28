// Learn more at developers.reddit.com/docs
import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  redditAPI: true,
});
//hiii there
// Add a menu item to the subreddit menu for instantiating the new experience post
Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Timer Game',
  height: 'regular',
  render: (_context) => {
    const [target, setTarget] = useState<number>(0);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [elapsed, setElapsed] = useState<number>(0);
    const [score, setScore] = useState(0);    
        const startGame = (): void => {
          setTarget(Math.floor(Math.random() * 11) + 5);
          setStartTime(Date.now());
          setElapsed(0);
        };
      
        const stopGame = (): void => {
          if (startTime) {
            const currentElapsed = (Date.now() - startTime) / 1000;
            setElapsed(currentElapsed);
            console.log(`target: ${target}, elapsed: ${currentElapsed}`);
            setScore(Math.abs(target - currentElapsed));
          }
        };
      
    return (
      <vstack alignment='center middle' height='100%' gap='large'>
        <text size='xxlarge' weight='bold'>
          Stopwatch
        </text>
        <text>
          Target Time: {target} seconds
        </text>
        target === 0 ? (
          <button appearance="primary" onPress={startGame}>
              Start game! 
          </button>
        {elapsed ===  0 ? (
          <button appearance="primary" onPress={stopGame}> Stop </button>
            ) : (
          <vstack alignment='center middle' gap="small">
            <text>Your Time: {elapsed.toFixed(2)} seconds</text>
            <text>Your were off by: {score.toFixed(2)} seconds</text>
          </vstack>
        )};
        )
      </vstack>
    );
  },
});

export default Devvit;
