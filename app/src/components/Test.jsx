function Test() {
  return (
    <>
      <div id="test">Test</div>
      <style>
        {`#test{
            color: red;
            animation: changecolor 2s ease forwards;
        }
        @keyframes changecolor {
            from {
              color: red;
            }
            to {
              color: blue;
            }
          }
        `}
      </style>
    </>
  );
}

export default Test;
