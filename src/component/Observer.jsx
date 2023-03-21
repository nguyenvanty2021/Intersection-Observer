import React from "react";
import { useObserver } from "../hooks/useObserver2";
import video from "../assets/video.mp4";
import "./image.css";
let Observer = () => {
  const targetMiddle = React.useRef();
  const targetTop = React.useRef();

  let observerMiddle = useObserver(targetMiddle);
  let observerTop = useObserver(targetTop);

  console.log(observerMiddle);
  console.log(observerTop);

  // RETURN
  return (
    <div className="App1 Observer">
      <h1 className="title">Intersection Observer API</h1>
      <p className={observerTop ? "observer-text active" : "observer-text"}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis
        exercitationem laudantium mollitia doloribus illum quis quam officia
        harum cupiditate est impedit, placeat et natus voluptate eum saepe!
        Exercitationem aperiam quam qui delectus quae consectetur vitae
        obcaecati dicta, voluptas iure voluptatem omnis et dolor sequi,
        excepturi, odit aliquid minima reprehenderit adipisci quidem corporis
        repellat! Modi, veniam? In cum maiores neque id necessitatibus
        temporibus repellendus, tempore natus facere sed consequatur ipsum,
        voluptatem soluta officiis quibusdam earum dolores saepe. Iure deserunt
        molestias nobis consequatur vitae veritatis laborum rem ut porro!
        Laudantium, vitae? Eaque, quam mollitia natus et neque ad tempora iusto
        quidem autem velit aperiam odit eligendi omnis maiores cupiditate ipsum
        alias doloremque! Earum necessitatibus magnam adipisci excepturi ullam
        accusantium ex, voluptatem sapiente cum voluptatum non reiciendis autem
        quas repudiandae. Molestias voluptas, eos beatae non rem adipisci
        architecto autem dolorem voluptatem nam ea ad illo accusamus quisquam
        temporibus consequuntur officiis earum aut culpa possimus quae pariatur!
        Accusamus, architecto vero. Dolor atque dolorum placeat saepe, ab
        tempora sapiente eos deleniti quia optio sit quaerat fuga consequatur
        Molestias voluptas, eos beatae non rem adipisci architecto autem dolorem
        voluptatem nam ea ad illo accusamus quisquam temporibus consequuntur
        officiis earum aut culpa possimus quae pariatur! Accusamus, architecto
        vero. Dolor atque dolorum placeat saepe, ab tempora sapiente eos
        deleniti quia optio sit quaerat fuga consequatur
      </p>
      <br />
      <h3 ref={targetTop}>TOP {observerTop && "I'm visible!!!"}</h3>
      <br />
      <p className={observerTop ? "observer-text active" : "observer-text"}>
        debitis doloremque reprehenderit fugit iure numquam obcaecati corporis
        repudiandae soluta, tenetur ratione inventore. Necessitatibus beatae
        omnis aperiam possimus, unde cumque sit reiciendis illum, ipsa corporis
        eligendi accusamus aliquam nulla voluptatem quis impedit sunt et eveniet
        recusandae deleniti? Beatae facilis recusandae ab, nihil a perferendis
        repellendus voluptatibus minima porro quia est esse animi iste, deleniti
        illum harum quae voluptas. Ipsum nihil maiores ut pariatur iusto
        inventore rem molestias, nobis, magnam quasi alias velit? Neque corrupti
        dolor debitis necessitatibus illo reprehenderit, vitae doloremque ex
        iusto a temporibus eaque adipisci numquam tempora blanditiis, ducimus
        inventore mollitia quisquam provident ad doloribus aliquam. Facere
        architecto voluptate pariatur, ducimus placeat necessitatibus natus
        reprehenderit assumenda. Temporibus consequatur quis quod quasi rem
        assumenda voluptatibus eveniet, magnam minima molestiae, voluptates
        fugit. Labore eius iste mollitia aperiam error eaque magni itaque
        sapiente ipsum laboriosam iure ex eos dolore exercitationem tempore quo
        quisquam, ea nemo expedita nulla perspiciatis eum. Eos beatae
        consectetur quam modi unde molestias ex atque maiores, veniam nisi
        commodi? Animi sint perspiciatis nostrum in, natus ea repellendus
        aperiam voluptas dignissimos aut facere repellat laboriosam ad
        doloremque illo vitae vel iste! Necessitatibus natus explicabo, aperiam
        alias magni, suscipit excepturi velit in quam aliquid quia blanditiis
        vel adipisci labore illum libero rerum eum incidunt ipsam eveniet
        obcaecati vero similique? Facilis aliquam impedit modi! Quis
        praesentium, incidunt vitae unde cum beatae possimus quae ad, id
        asperiores molestiae accusantium quos veniam eum doloribus sapiente,
        eius consectetur cupiditate veritatis illo libero? Blanditiis eum hic
        corporis excepturi quis! Est dolor atque assumenda nemo modi qui
        necessitatibus corrupti dolores eveniet ea corporis repudiandae
        architecto repellendus, maiores nobis quisquam harum ipsum error
      </p>

      <br />
      <h3 ref={targetMiddle}>Middle {observerMiddle && "I'm visible!!!"}</h3>
      <br />
      {observerMiddle ? (
        <video
          muted
          autoPlay
          loop
          width="420"
          src={video}
          type="video/mp4"
        ></video>
      ) : (
        <img className="img-placeholcer" src="placeholder.png" alt="img" />
      )}
      <p className={observerMiddle ? "observer-text active" : "observer-text"}>
        pariatur? Vitae, nemo? Eligendi quas aperiam dolorem atque excepturi
        dolor tenetur, aut quasi quis architecto voluptas labore voluptatibus
        perspiciatis quod quisquam iste expedita. Blanditiis cupiditate minima
        id similique ipsa eveniet ipsum. Tempora nostrum magnam voluptatibus
        animi numquam. Quaerat dignissimos nobis molestiae veniam error quis
        natus molestias assumenda! Quisquam ut omnis soluta veritatis a
        cupiditate dolorem reiciendis atque excepturi, quaerat id sint quia
        accusantium nihil saepe maiores unde exercitationem debitis velit
        ratione pariatur fugiat deserunt beatae. Corporis mollitia nobis
        necessitatibus praesentium iure, quae dolores quibusdam animi incidunt
        cupiditate dolorum eaque dignissimos, quidem alias temporibus natus
        provident! Dolor omnis consequatur labore, quod vitae explicabo cum, et
        repellendus numquam iure libero officiis. Perspiciatis, dolorem
        aspernatur natus voluptatibus iure commodi quos repudiandae! Sed,
        veritatis maiores. Officiis voluptates veniam voluptate rem perspiciatis
        fugit, incidunt in, soluta eligendi aliquid maiores nisi nobis impedit
        praesentium eos aut beatae ea! Qui, adipisci quam! Assumenda quibusdam
        aliquam, rerum distinctio veritatis repellendus et dolorum modi eaque
        vitae fugiat iste. Doloremque repellendus eos accusantium odio atque
        aperiam quos, ad magnam consectetur voluptates itaque reprehenderit
        vitae perferendis, molestiae aliquam est omnis natus qui aut culpa?
        Placeat doloribus optio modi fugiat praesentium expedita possimus
        similique esse odio, totam libero eos harum nisi iste quam a veniam
        adipisci natus rerum assumenda ea molestias quod. Provident doloremque,
        hic cupiditate tempora temporibus modi. Commodi non possimus aut est
        ullam et nam quibusdam nisi quos ea, perferendis recusandae officia
        aspernatur sint laboriosam quisquam aperiam corporis aliquam fugiat
        animi! Necessitatibus mollitia, est veniam consectetur nam nulla facilis
        voluptatum sequi dignissimos culpa quisquam quidem fugit repellat magni
        laborum, dolores quis quae corporis sint esse expedita iure ex rem.
      </p>
    </div>
  );
};
Observer = React.memo(Observer);
export default Observer;
