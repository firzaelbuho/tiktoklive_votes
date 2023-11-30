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
        <p><strong class = "votes_received">Jumlah vote : 0</strong></p>
    </div>

    </div>

    `

  });



const percentage = document.getElementsByClassName("percentage")
// console.table(percentage)

const votes_received = document.getElementsByClassName("votes_received")
// console.table(votes_received)

const totalVotes = document.getElementById("total_votes")
const voters = document.getElementById("voters")
console.info(voters)
const gifters = document.getElementById("gifters")
console.info(gifters)

// fungsi sum
function sumArray(array) {
    // Menggunakan metode reduce untuk menjumlahkan elemen-elemen array
    const total = array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total;
}
  
  // Contoh penggunaan fungsi sumArray
  const numbers = [1, 2, 3, 4, 5];
  const result = sumArray(numbers);
  
  console.log(result); // Output: 15
  
// fungsi update display

function updatePage(data){
    voters.innerHTML ="";
    data.voters.forEach(function(voter){
        voters.innerHTML += `<p>${voter}</p>`
    })

    gifters.innerHTML ="";
    data.gifters.forEach(function(gifter){
        gifters.innerHTML += `<p>${gifter}</p>`
    })

    for(i=0 ; i<candidates.length; i++){
        votes_received[i].innerHTML = `Jumlah Vote : ${data.votes[i]}`
        percentage[i].innerHTML = `${Number((data.votes[i] / sumArray(data.votes) * 100).toFixed(2))}%`
    }

    totalVotes.innerHTML = `Daftar voters valid (${sumArray(data.votes)} votes)`
}

async function fetchData(){

    // Buat objek Date
    var currentDate = new Date();

    // Dapatkan timestamp saat ini
    var timestamp = currentDate.getTime();

    // Cetak timestamp
    console.log("Timestamp saat ini:", timestamp);

    // URL API yang akan diambil datanya
    const url = 'http://localhost:3000/combo';

    var headers = {}

    // Menggunakan fetch untuk mengambil data dari API
    fetch(url, {
        method : "GET",
        mode: 'cors',
        headers: headers
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
    updatePage(data)
   

    
  })
  .catch(error => {
    // Menangani kesalahan
    console.error('Terjadi kesalahan:', error);
  });
}

const pollingInterval = setInterval(fetchData, 1000);







