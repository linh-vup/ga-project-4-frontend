import '../../styles/progress-bar.scss';

function ProgressBarComponent({ allColors, consumedColors }) {
  if (!allColors || !consumedColors) return;

  const width = Math.floor(100 / allColors.length) + '%';
  return (
    <div id='consumed-colors-progress'>
      {allColors.map((color) => {
        if (consumedColors.includes(color)) {
          return (
            <div width={width} className={color + ' active'} key={color.id} />
          );
        } else {
          return <div width={width} className={color} key={color.id} />;
        }
      })}
    </div>
  );
}

export default ProgressBarComponent;
