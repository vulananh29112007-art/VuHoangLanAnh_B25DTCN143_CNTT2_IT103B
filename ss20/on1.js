//mảng gốc
let Songs = [
    { id: 1, name: "Open arms", singer: "SZA" },
    { id: 2, name: "Snooze", singer: "SZA" },
]

let editId = null;
//tạo
function addSong(e) {
    e.preventDefault();

    const titleInput = document.getElementById("title");
    const artistInput = document.getElementById("artist");

    const title = titleInput.value.trim();
    const artist = artistInput.value.trim();

    if (!title || !artist) {
        alert("Không được để trống");
        return;
    }

    // cap nhat trong add
    if (editId !== null) {
        let index = Songs.findIndex(s => s.id === editId);

        Songs[index].name = title;
        Songs[index].singer = artist;

        // reset trạng thái
        editId = null;
        document.getElementById("formTitle").innerText = "🎵 Thêm bài hát";
        document.getElementById("submitBtn").innerText = "Thêm";
    }
    // them
    else {
        const newSong = {
            id: Songs.length ? Songs[Songs.length - 1].id + 1 : 1,
            name: title,
            singer: artist,
        };

        Songs.push(newSong);
    }

    // lưu localStorage
    localStorage.setItem("Songs", JSON.stringify(Songs));

    // reset form
    titleInput.value = "";
    artistInput.value = "";

    // render lại
    renderSong();
}

//sửa
function editSong(id) {
    let song = Songs.find(s => s.id === id);

    // cho lại chỗ edit thành value 2 ô
    document.getElementById("title").value = song.name;
    document.getElementById("artist").value = song.singer;

    // đổi tiêu đề + nút
    document.getElementById("formTitle").innerText = "Sửa bài hát";
    document.getElementById("submitBtn").innerText = "Cập nhật";

    editId = id;
}

//hiển thị
function renderSong(data = Songs) {
    let songList = document.getElementById("songTable");
    // trang giấy mới chx có gì
    songList.innerHTML = "";
    //duyệt để đẩy
    data.forEach((song) => {
        //dán giấy vào tường
        songList.innerHTML += `<tr>
                    <td>${song.id}</td>
                    <td>${song.name}</td>
                    <td>${song.singer}</td>
                    <td>
                    <button onclick="editSong(${song.id})">Sửa</button>
                    <button onclick="deleteSong(${song.id})">Xóa</button>
                    </td>
                </tr>
        `
    })
}

//xóa bài hát
function deleteSong(id) {
    if (confirm("Bạn có chắc muốn xóa bài hát này?")) {
        Songs = Songs.filter(song => song.id !== id);
        renderSong(Songs);
    } else {
        return false;
    }
}

//tìm tên bài hát
function searchSong() {
    //tìm theo tên và lấy gtri nhập
    let findSongEl = document.getElementById("search");
    let findSong = findSongEl.value;
    let song = Songs.filter((song) => song.name.toLowerCase().includes(findSong.toLowerCase()));

    renderSong(song);
}

renderSong();