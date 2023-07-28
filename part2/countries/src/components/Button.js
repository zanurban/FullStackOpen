const Button = ({ visibleCountries, setVisibleCountries, name }) => {

    const toggleVisibility = () => {
      let newVisibility = { ...visibleCountries }
      newVisibility[name] = !visibleCountries[name]
      setVisibleCountries(newVisibility)
    }
  
    return (
      <button onClick={toggleVisibility}>
        {visibleCountries[name] ? "Hide" : "Show"}
      </button>
    )
  }
  
  export default Button
  