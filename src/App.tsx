import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import useElementOnScreen from "./hooks/useElementOnScreen";
import Loading from "./loading.gif";
import { fetchImages } from "./utils/fetchImages.js";
import { Image } from "./component/image";
function App() {
  const [page, setPage] = useState(1);
  const [imagesList, setImagesList] = useState<any[]>([]);
  const nextPage = () => {
    setPage(page + 1);
  };
  const [photos, setPhotos] = useState<any>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState(false);
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
      const cards = document.querySelectorAll(".card");
      const observer = new IntersectionObserver((entries) => {
        // thuộc tính isIntersecting (true/false) dùng để check xem img này có trong viewport (hiển thị ở màn hình hiện tại không), true là có, false là không
        // thuộc tính intersectionRatio là % khung chứa img này được hiển thị trên viewport
        console.log(entries);
        // những element xuất hiện trong viewport
        entries.forEach(
          (entry) => {
            // console.log(entry.isIntersecting);
            // console.log(entry.target); // is src of img
            load(entry.target);
            entry.target.classList.toggle("show", entry.isIntersecting);
            // if (entry.isIntersecting) observer.unobserve(entry.target); // bỏ hiệu ứng load lại data cũ
          },
          {
            threshold: 1,
            // rootMargin: "-100px",
          }
        );
      });
      lazyImgs.forEach((img) => {
        //   console.log(img);
        observer.observe(img);
      });
      cards.forEach((card) => {
        observer.observe(card);
      });
    } else {
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect
    }
  };
  const fetchPhotos = async (pageNumber: number) => {
    const Access_Key = "VaS3ud1C-0gdW1nw41FbBryaV_Q5obZ04o-3Vi2QC1E";
    const res = await fetch(
      `https://api.unsplash.com/photos/?client_id=${Access_Key}&page=${pageNumber}&per_page=10`
    );
    const data = await res.json();
    // console.log(data)
    setPhotos((p: any) => [...p, ...data]);
    setLoading(true);
  };
  const loadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const pageEnd: any = useRef();
  // let num = 1;
  useEffect(() => {
    if (loading) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // num++;
            loadMore();
            // if (num >= 10) {
            //   observer.unobserve(pageEnd.current);
            // }
          }
        },
        { threshold: 1 }
      );
      observer.observe(pageEnd.current); // ref element button dùng để check trong viewport
    }
  }, [
    loading,
    //  num
  ]);
  useEffect(() => {
    fetchPhotos(pageNumber);
  }, [pageNumber]);
  useEffect(() => {
    handleIntersectionObserver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    fetchImages(page).then((images) =>
      setImagesList((prev) => [...prev, ...images])
    );
  }, [page]);
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
      {/* cách này là tối ưu nhất, element nào nằm trong viewport thì mới load image đó lên */}
      {imagesList.map((image: any, index) => (
        <Image
          key={image.id}
          image={image}
          isLast={index === imagesList.length - 1}
          nextPage={nextPage}
        />
      ))}
      <div className="card-container">
        <div className="card">This is the first card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>{" "}
        <div className="card">This is a card</div>
        <div className="card">This is a card</div>
        <div className="card">This is the last card</div>
      </div>
      <h1>Infinite scrolling react hooks</h1>
      {/* cách này không tối ưu vì khi call page mới nó sẽ load 1 lượt hết 10 img luôn (mặc dù có những img không nằm trong viewport) */}
      {photos.map((photo: any, index: number) => (
        <div className="photos" key={index}>
          <img src={photo.urls.small} alt="" />
          <p>{photo.user.first_name + " " + photo.user.last_name}</p>
          <span>Like: {photo.user.total_likes}</span>
        </div>
      ))}
      <div className="loading">
        <img src={Loading} alt="" />
      </div>

      <h3>{photos.length}</h3>

      <button
        style={{ visibility: "hidden" }}
        // onClick={loadMore}
        ref={pageEnd}
      >
        Load More
      </button>
    </div>
  );
}

export default App;
