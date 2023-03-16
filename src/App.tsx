import React, { useEffect, useRef } from "react";
import "./App.css";
import useElementOnScreen from "./hooks/useElementOnScreen";

function App() {
  const myRef: any = useRef(null);
  const isVisible = useElementOnScreen(
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    },
    myRef
  );
  const load = (img: any) => {
    const url = img.getAttribute("lazy-src");
    img.setAttribute("src", url);
    // img.removeAttribute("lazy-src");
  };
  const handleIntersectionObserver = () => {
    if ("IntersectionObserver" in window) {
      // has support
      const lazyImgs = document.querySelectorAll("[lazy-src]");
      const observer = new IntersectionObserver((entries) => {
        // thuộc tính isIntersecting (true/false) dùng để check xem img này có trong viewport (hiển thị ở màn hình hiện tại không), true là có, false là không
        // thuộc tính intersectionRatio là % khung chứa img này được hiển thị trên viewport
        console.log(entries);
        entries.forEach((entry) => {
          // console.log(entry.isIntersecting);
          // console.log(entry.target); // is src of img
          load(entry.target);
        });
      });
      lazyImgs.forEach((img) => {
        //   console.log(img);
        observer.observe(img);
      });
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    }
  };
  useEffect(() => {
    handleIntersectionObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column" }} className="App">
      <h1
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "red",
          width: "100%",
          margin: 0,
          padding: 0,
        }}
      >
        {!isVisible ? "not in viewport" : "in viewport"}
      </h1>
      <h1 ref={myRef} style={{ backgroundColor: "pink", height: "1000px" }}>
        123
      </h1>
      <img
        ref={myRef}
        style={{ backgroundColor: "red" }}
        alt=""
        src="https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg" // img default
        lazy-src="https://media.gettyimages.com/id/167866478/photo/strawberry.jpg?s=612x612&w=gi&k=20&c=hP-3tsdT85B3-AHQ8n1r-9IsdLDKNLujVd9xeHeKuqQ="
      />
      {/* <img
        ref={myRef}
        style={{ backgroundColor: "blue" }}
        alt=""
        src="https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg" // img default
        lazy-src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?cs=srgb&dl=pexels-pixabay-326055.jpg&fm=jpg"
      />
      <img
        ref={myRef}
        style={{ backgroundColor: "green" }}
        alt=""
        src="https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg" // img default
        lazy-src="https://us.123rf.com/450wm/maaravic/maaravic2210/maaravic221000286/193002567-background-of-butterflies-of-different-colors-rainbow-different-sizes-and-shapes-very-beautiful.jpg?ver=6"
      />
      <img
        ref={myRef}
        style={{ backgroundColor: "yellow" }}
        alt=""
        src="https://user-images.githubusercontent.com/43302778/106805462-7a908400-6645-11eb-958f-cd72b74a17b3.jpg" // img default
        lazy-src="https://thumbs.dreamstime.com/b/d-mural-wallpaper-beautiful-view-landscape-background-old-arches-tree-sun-water-birds-flowers-transparent-curtains-166191190.jpg"
      /> */}
    </div>
  );
}

export default App;
