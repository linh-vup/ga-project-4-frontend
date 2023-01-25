import '../../styles/Carousel.scss';

export default function Carousel() {
  return (
    <>
      <div id='carousel-body'>
        <input type='radio' name='position' checked />
        <input type='radio' name='position' />
        <input type='radio' name='position' />
        <input type='radio' name='position' />
        <input type='radio' name='position' />
        <div id='carousel'>
          <div className='item'></div>
          <div className='item'></div>
          <div className='item'></div>
          <div className='item'></div>
          <div className='item'></div>
        </div>
      </div>
    </>
  );
}
