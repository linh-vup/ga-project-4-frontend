import ProgressBar from 'react-bootstrap/ProgressBar';
import '../../styles/Test.scss';

function StackedExample({ redValue, yellowValue, greenValue }) {
  return (
    <ProgressBar bsClass='custom-class'>
      <ProgressBar striped animated variant='danger' now={redValue} key={1} />
      <ProgressBar
        striped
        animated
        variant='warning'
        now={yellowValue}
        key={2}
      />
      <ProgressBar
        striped
        animated
        variant='success'
        now={greenValue}
        key={3}
      />
    </ProgressBar>
  );
}

export default StackedExample;
