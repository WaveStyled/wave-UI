import { API, NODEPORT } from "../../../context/API";

export function submit(props, type) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(props),
  };
  fetch(`http://${API}:${NODEPORT}/${type}`, requestOptions)
    .then(async (res) => {
      try {
          const authenticate = null;
      } catch (err) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}



const onLoggedIn = (token) => {
    fetch(`${API_URL}/private`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        try {
          const jsonRes = await res.json();
          if (res.status === 200) {
            setMessage(jsonRes.message);
          }
        } catch (err) {
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };