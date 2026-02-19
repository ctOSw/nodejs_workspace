const http = require("http");

const PORT = 3100;
const HOST_NAME = "localhost";

let users = [
  { id: "1", name: "Arda", age: 20 },
  { id: "2", name: "Joe", age: 24 },
  { id: "3", name: "Mike", age: 30 },
  { id: "4", name: "Hasan", age: 27 },
  { id: "5", name: "Ali", age: 25 },
  { id: "6", name: "Gary", age: 34 },
  { id: "7", name: "Nancy", age: 25 },
  { id: "8", name: "Emily", age: 30 },
  { id: "9", name: "Jimy", age: 32 },
  { id: "10", name: "Marco", age: 23 },
];

const SERVER = http.createServer((req, res) => {
  const { url, method } = req;

  // delete isteğindeki hatanın çözümü
  const parts = url.split("/");

  //   kullanıcıları listele
  if (url === "/users" && method === "GET") {
    const userList = JSON.stringify(users);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(userList);
  } // yeni kullanıcı ekle
  else if (url === "/users" && method === "POST") {
    let body = "";

    // 1. Veri parçalarını (stream) dinle
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // 2. Tüm veri geldiğinde çalışacak kısım
    req.on("end", () => {
      try {
        const parsedUser = JSON.parse(body);

        // Yeni bir ID oluştur (Basitçe son ID + 1)
        const newId = (users.length + 1).toString();

        const newUser = {
          id: newId,
          name: parsedUser.name || "İsimsiz",
          age: parsedUser.age || 0,
        };

        users.push(newUser);

        res.writeHead(201, { "content-type": "application/json" });
        res.end(
          JSON.stringify({ message: "Kullanıcı eklendi", user: newUser }),
        );
      } catch (error) {
        // Geçersiz JSON gönderilirse hata döndür
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Geçersiz JSON verisi!" }));
      }
    });
  } // kullanıcı silme
  else if (parts[1] === "users" && parts[2] && method == "DELETE") {
    const userId = parts[2];
    users = users.filter((user) => user.id !== userId);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(users));
  } // kullanıcı düzenleme
  else if (parts[1] === "users" && parts[2] && method == "PUT") {
    const userId = parts[2];
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const updatedData = JSON.parse(body);
        const userIndex = users.findIndex((u) => u.id === userId);

        if (userIndex !== -1) {
          // 2. Kullanıcıyı güncelle (Eski verilerle yenileri birleştir)
          users[userIndex] = {
            ...users[userIndex],
            ...updatedData,
            id: userId, // ID'nin değişmemesini garantiye alıyoruz
          };

          res.writeHead(200, { "content-type": "application/json" });
          res.end(
            JSON.stringify({ message: "Güncellendi", user: users[userIndex] }),
          );
        } else {
          res.writeHead(404, { "content-type": "application/json" });
          res.end(JSON.stringify({ error: "Kullanıcı bulunamadı!" }));
        }
      } catch (error) {
        res.writeHead(400, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "Veri işlenirken hata oluştu!" }));
      }
    });
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 Error Not Found");
  }
});

SERVER.listen(PORT, HOST_NAME, () => {
  console.log(`Sunucu  ${PORT} portunda çalışıyor`);
});
