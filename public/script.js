class Candidate {
    // Constructor untuk inisialisasi objek
    constructor(number, name1, name2, img1, img2, color) {
      this.number = number;
      this.name1 = name1;
      this.name2 = name2;
      this.img1 = img1;
      this.img2 = img2;
      this.color = color;
    }
}

const candidates = [
    new Candidate(1, "Anies", "Muhaimin", "anis_baru.jpeg", "muhaimin_baru.jpeg", "blue"),
    new Candidate(2, "Prabowo", "Gibran", "prabowo_baru-removebg-preview.png", "gibran_baru-removebg-preview.png", "orange"),
    new Candidate(3, "Ganjar", "Mahfud", "ganjar_baru.jpeg", "mahfud_baru.jpeg", "red")
]

const candidatesSection = document.getElementById("candidates_section")

candidates.forEach(function(candidate) {
    console.table(candidate);

    candidatesSection.innerHTML += `

    <div class="col-4 text-center border p">
    <strong>${candidate.name1} - ${candidate.name2}</strong>
    <div class="div border pt-3">
        <img src="asset/${candidate.img1}" alt="" width="90px">
        <img src="asset/${candidate.img2}" alt="" width="90px">
    </div>

    <div class="div p-5" style="background-color:${candidate.color}" >
        <h2 class="text-white">${candidate.number}</h2>
    </div>

    <div class="p-3 border mb-3">
        <h3 class ="percentage" >0%</h3>
        <p class = "votes_received" ><strong>Jumlah vote : 0</strong></p>
    </div>

    </div>

    `

  });



const percentage = document.getElementsByClassName("percentage")
// console.table(percentage)

const votes_received = document.getElementsByClassName("votes_received")
// console.table(votes_received)

const voters = document.getElementById("voters")
console.info(voters)
const gifters = document.getElementById("gifters")
console.info(gifters)


// URL API yang akan diambil datanya
const url = 'http://localhost:3000/combo';

// Menggunakan fetch untuk mengambil data dari API
fetch(url, {
    method : "GET",
    mode: 'cors'
})
  .then(response => {
    // Memeriksa apakah respons dari server OK (kode status 200-299)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Mengembalikan respons dalam bentuk JSON
    return response.json();
  })
  .then(data => {
    // Menangani data JSON
    console.log('Data dari API:', data);
  })
  .catch(error => {
    // Menangani kesalahan
    console.error('Terjadi kesalahan:', error);
  });




