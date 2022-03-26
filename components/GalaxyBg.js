const GalaxyBg = ({ children }) => {
  return (
    <div className="min-h-screen bg-[url('/galaxy.jpg')] bg-cover flex flex-col items-center justify-center">
      {children}
    </div>
  )
}

export default GalaxyBg
