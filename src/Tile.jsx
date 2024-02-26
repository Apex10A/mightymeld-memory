export function Tile({ content: Content, flip, state }) {
  const tileStyle = {
    transition: "transform 3s ease-in-out" // Add transition property
  };
  switch (state) {
    case "start":
      return (
        <Back
          className="inline-block h-[75px] w-[75px] duration-300 ease-in-out cursor-pointer bg-[#C7D2FF] rounded-xl text-center"
          flip={flip}
        />
      );
    case "flipped":
      return (
        <Front className="inline-block duration-300 ease-in-out rounded-xl h-18 w-18 bg-[#6466F1] text-[#fff] p-2" >
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Front>
      );
    case "matched":
      return (
        <Matched className="inline-block h-[70px] w-[70px] text-[#d1dafc] pt-2 rounded-xl" style={tileStyle}>
          <Content
            style={{
              display: "inline-block",
              width: "100%",
              height: "100%",
              verticalAlign: "top",
            }}
          />
        </Matched>
      );
    default:
      throw new Error("Invalid state " + state);
  }
}

function Back({ className, flip, darkMode }) {
  return (
    <div onClick={flip} className={className}>

    </div>
  );
}

function Front({ className, children }) {
  return <div className={className}>{children}</div>;
}

function Matched({ className, children }) {
  return <div className={className}>{children}</div>;
}
