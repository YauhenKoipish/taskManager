const loaderElementsList = ['first-block', 'second-block', 'third-block', 'fourth-block', 'fifth-block'];

export const Loader = () => (
  <>
    <span className='loader-title'>Dims-11-loader</span>
    <div className='loader'>
      {loaderElementsList.map((item) => (
        <div key={item} className='loader__elem' />
      ))}
    </div>
  </>
);
