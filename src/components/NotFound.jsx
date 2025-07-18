function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center gap-5'>
      <p className='text-blue-500 font-bold text-5xl'>Not Found</p>
      <p className='text-gray-700 text-xl'>The page you are looking for does not exist.</p>
    </div>
  );
}

export default NotFound;