function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-3'>
      <p className='text-blue-500 font-bold text-4xl md:text-5xl lg:text-5xl xl:text-5xl text-center'>Not Found</p>
      <p className='text-gray-700 text-sm md:text-lg lg:text-lg xl:text-lg text-center'>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;