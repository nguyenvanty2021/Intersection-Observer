import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import useElementOnScreen from "./hooks/useElementOnScreen";
import Loading from "./loading.gif";
import { fetchImages } from "./utils/fetchImages.js";
import { Image } from "./component/image";
import Observer from "./component/Observer";
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
  // const load = (img: any) => {
  //   const url = img.getAttribute("lazy-src");
  //   img.setAttribute("src", url);
  //   // img.removeAttribute("lazy-src");
  // };
  const handleIntersectionObserver = () => {
    if ("IntersectionObserver" in window) {
      // has support
      // const lazyImgs = document.querySelectorAll("[lazy-src]");
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
            // load(entry.target);
            // thêm thuộc tính class vào element
            entry.target.classList.toggle("show", entry.isIntersecting);
            // if (entry.isIntersecting) observer.unobserve(entry.target); // bỏ hiệu ứng load lại data cũ
          },
          {
            threshold: 1,
            // rootMargin: "-100px",
          }
        );
      });
      // lazyImgs.forEach((img) => {
      //   //   console.log(img);
      //   observer.observe(img);
      // });
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
    fetchImages(page).then((images) => {
      console.log(images);
      setImagesList((prev) => [...prev, ...images]);
    });
  }, [page]);
  // useEffect(() => {
  //   // cách này tối ưu thứ 2
  //   let observer = new window.IntersectionObserver(function (entries, self) {
  //     console.log("entries", entries);
  //     console.log("self", self);
  //     // iterate over each entry
  //     entries.forEach((entry) => {
  //       // process just the images that are intersecting.
  //       // isIntersecting is a property exposed by the interface
  //       if (entry.isIntersecting) {
  //         // custom function that copies the path to the img
  //         // from data-src to src
  //         loadImages(entry.target);
  //         // the image is now in place, stop watching
  //         self.unobserve(entry.target);
  //       }
  //     });
  //   }, config);

  //   const imgs = document.querySelectorAll("[data-src]");
  //   imgs.forEach((img) => {
  //     observer.observe(img);
  //   });
  //   return () => {
  //     imgs.forEach((img) => {
  //       observer.unobserve(img);
  //     });
  //   };
  // }, []);

  // const loadImages = (image: any) => {
  //   image.src = image.dataset.src;
  // };
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
      <Observer />
      <h1 ref={myRef} style={{ backgroundColor: "pink" }}>
        123
      </h1>
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
