export const MenuButton = (
  {
    menuOpen,
    setMenuOpen
  }: {
    menuOpen: boolean,
    setMenuOpen: (val: boolean) => void
  }
) => {
  return (
    <button className={
      `bg-brand mr-4 mb-4 z-20 fixed bottom-0 right-0 border border-black w-20
      h-20 rounded-full transition-all duration-500 ${menuOpen && 'right-3/4'}
      flex justify-center items-center`
    } onClick={(e) => {
      e.preventDefault();
      e.stopPropagation()
      setMenuOpen(!menuOpen)
      return false
    }}>
      <div className="  h-1/2 w-1/2 items-center justify-center">
        <MenuLine classes={menuOpen && "transform rotate-45 translate-1"} />
        <MenuLine classes="" />
        <MenuLine classes={menuOpen && "transform -rotate-45 translate-x-1 -translate-y-1"} />
      </div>
    </button>
  )
}

const MenuLine = ({ classes }: { classes: string | false }) =>
  <div className={`mb-2 w-full h-2 bg-white rounded transition-transform ` + classes}></div>
