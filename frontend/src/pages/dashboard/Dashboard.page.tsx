import { useEffect, useState } from "react";
import { useJwt } from "../../context/Jwt.context";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const redirect = useNavigate();
  const jwt = useJwt();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (!jwt.isLoggedIn()) {
      redirect("/signin", { replace: true });
      return;
    }
  }, []);
  return (
    <div className="content home">
      <h3>Welcome To Website</h3>
      <br />
      <br />
      <span>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia mollitia
        modi qui, suscipit repudiandae necessitatibus officiis minus provident
        quaerat. Assumenda quibusdam nesciunt nulla corrupti, repellendus at aut
        animi fugiat eos et ullam, consequuntur in eveniet iste delectus error
        aperiam odit necessitatibus harum placeat, autem beatae non ipsa nobis?
        Odit et optio laudantium laboriosam modi enim a eius excepturi. Qui at
        quidem necessitatibus id maiores magni quam, earum unde quis, error
        deleniti doloremque sequi laudantium reprehenderit nobis consequatur
        quisquam perspiciatis quasi sit natus repellendus? Pariatur ratione
        velit quisquam ea rem esse fuga, eveniet earum culpa deserunt modi
        accusantium illum odio libero?
      </span>
    </div>
  );
}
