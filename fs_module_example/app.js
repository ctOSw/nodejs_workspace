const fs = require("fs");

const initialData = [
  { id: 1, name: "Ahmet Yılmaz", position: "Geliştirici" },
  { id: 2, name: "Ayşe Demir", position: "Tasarımcı" },
];

//   employees.json dosyası oluşturuldu ve içerik eklendi
fs.writeFile("employees.json", JSON.stringify(initialData), "utf-8", (err) => {
  if (err) throw err;

  console.log(
    "employees.json dosyası başarıyla oluşturuldu ve içerik eklendi.",
  );
});

// dosyayı okuyalım
fs.readFile("./employees.json", "utf-8", (err, data) => {
  if (err) throw err;

  console.log(`Dosya içeriği görüntüleniyor : ${data}`);
});

// dosyayı güncelleyeim
fs.readFile("./employees.json", "utf-8", (err, data) => {
  if (err) throw err;
  let employees = JSON.parse(data);
  
//kişi bilgisini güncelle
  employees = employees.map((emp) =>
    emp.id === 1 ? { ...emp, position: "Kıdemli Geliştirici" } : emp,
  );

  fs.writeFile("employees.json", JSON.stringify(employees), "utf-8", (err) => {
    if (err) throw err;
    console.log("Ahmet Yılmaz'ın pozisyonu güncellendi.");
  });
});

// dosyayı sil
fs.unlink("./employees.json", (err) => {
  if (err) throw err;
  console.log("Dosya başarıyla silindi");
});


