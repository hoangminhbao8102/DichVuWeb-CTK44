const cautraloi = document.querySelectorAll('.cautraloi');
const submitBtn = document.getElementById('submit');
const quiz = document.getElementById('question');
let socaudung = 0;
let cauhoi_hientai = 0;
let diem = 0;

load_cauhoi();

function load_cauhoi(){
    remove_answer();
    fetch('http://localhost/restful_php_api/api/question/read.php')
    .then(res => res.json())
    .then(data => {
        console.log(data.question);
        document.getElementById('tongsocauhoi').value = data.question.length;
        
        const cauhoi = document.getElementById('title');
        const a_cautraloi = document.getElementById('a_cautraloi');
        const b_cautraloi = document.getElementById('a_cautraloi');
        const c_cautraloi = document.getElementById('a_cautraloi');
        const d_cautraloi = document.getElementById('a_cautraloi');

        const get_cauhoi = data.question[cauhoi_hientai];
        //console.log(get_cauhoi);

        cauhoi.innerText = get_cauhoi.cauhoi;
        a_cautraloi.innerText = get_cauhoi.cau_a;
        b_cautraloi.innerText = get_cauhoi.cau_b;

        if (get_cauhoi.cau_c != null) {
            document.getElementById('cau_c').classList.remove('hienthicautraloi');
            c_cautraloi.innerText = get_cauhoi.cau_c;
        } else {
            document.getElementById('cau_c').classList.add('hienthicautraloi');
        }
        if (get_cauhoi.cau_d != null) {
            document.getElementById('cau_d').classList.remove('hienthicautraloi');
            d_cautraloi.innerText = get_cauhoi.cau_d;
        } else {
            document.getElementById('cau_d').classList.add('hienthicautraloi');
        }
        document.getElementById('caudung').value = get_cauhoi.cau_dung;
    })
    .catch(error => console.error());
}

function get_answer(){
    let answer = undefined;
    cautraloi.forEach((cautraloi) => {
        if (cautraloi.checked) {
            answer = cautraloi.id;
        }
    })
    return answer;
}

function remove_answer(){
    cautraloi.forEach((answer) => {
        answer.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    const answer = get_answer();
    console.log(answer);

    if (answer) {
        if (answer === document.getElementById('caudung').value) {
            socaudung++;
            diem = diem + 1;
        }
    }

    cauhoi_hientai++;
    load_cauhoi();

    if (cauhoi_hientai < document.getElementById('tongsocauhoi').value) {
        load_cauhoi();
    } else {
        quiz.innerHTML = `
        <h2>Bạn đã đúng ${socaudung}/${tongsocauhoi} câu hỏi.</h2>
        <p style="font-size:15px">Số điểm đạt được là : ${diem}</p>
        <button class="btn btn-warning" onclick="location.reload()">Làm lại bài</button>`;
    }
})