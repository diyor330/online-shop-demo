const cards = [...document.querySelectorAll('.product')];

let category = 'all';
let cart = 0;

const search = document.querySelector('#searchInput');
const sort = document.querySelector('#sortSelect');
const grid = document.querySelector('#productGrid');
const count = document.querySelector('#resultCount');
const empty = document.querySelector('#empty');
const toast = document.querySelector('#toast');

function render() {
    const q = search.value.trim().toLowerCase();

    let list = cards.filter(c =>
        (category === 'all' || c.dataset.category === category) &&
        (c.dataset.name + ' ' + c.textContent).toLowerCase().includes(q)
    );

    if (sort.value !== 'default') {
        list.sort((a, b) => {
            const x = +a.querySelector('.info>div b')
                .textContent.replace(/[^0-9]/g, '');

            const y = +b.querySelector('.info>div b')
                .textContent.replace(/[^0-9]/g, '');

            return sort.value === 'low' ? x - y : y - x;
        });
    }

    cards.forEach(c => c.hidden = true);

    list.forEach(c => {
        c.hidden = false;
        grid.append(c);
    });

    count.textContent = `商品 ${list.length} 件`;
    empty.hidden = !!list.length;
}

// Поиск товаров
document.querySelector('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    render();
});

search.addEventListener('input', render);

// Сортировка товаров
sort.addEventListener('change', render);

// Фильтрация по категориям
document.querySelectorAll('.cats button').forEach(b => {
    b.addEventListener('click', () => {
        category = b.dataset.category;

        document.querySelectorAll('.cats button').forEach(x => {
            x.classList.toggle('active', x === b);
        });

        render();
    });
});

// Добавление товаров в корзину
document.querySelectorAll('.add').forEach(b => {
    b.addEventListener('click', () => {
        cart++;

        document.querySelector('#cartCount').textContent = cart;

        toast.textContent = '商品をカートに追加しました（デモ）';
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 1800);
    });
});

// Просмотр корзины
document.querySelector('#cartButton').addEventListener('click', () => {
    toast.textContent = `カート内の商品：${cart} 点（デモ）`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
});

// Первоначальное отображение товаров
render();