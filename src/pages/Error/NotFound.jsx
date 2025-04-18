import notFoundLogo from '@/assets/404.svg'

function NotFound() {
  return <div className="w-full h-full flex items-center justify-center">
    <img className="w-1/2" src={notFoundLogo} alt="" />
  </div>
}

export default NotFound
