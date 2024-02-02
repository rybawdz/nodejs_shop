import { useRouter } from 'next/navigation';

function StoreItem({ item }) {
    
    const router = useRouter();

    const handleClick = (name) => (e) => {
        e.preventDefault();
        router.push('/buy?item=' + name);
    };
    
    return (
        <div className="storeItemBox" >
            <div className="itemPhoto">
                {item.photoUrl && (
                    <img src={'http://localhost:4040/' + item.photoUrl} alt="item photo" />
                )}
            </div>
            <div className="itemNameBox">
                {item.name && (
                    <p>{item.name}</p>
                )}
            </div>
            <div className="itemPriceBox">
                {item.price && (
                    <p>{item.price} PLN</p>
                )}
            </div>
            <div className="itemDescriptionBox">
                {item.description && (
                    <p>{item.description}</p>
                )}
            </div>
            <div className="buyBasketBox">
                {item.name ? (
                    <button onClick={handleClick(item.name)}>
                        Buy
                    </button>
                ) : (
                    <button>
                        Buy
                    </button>
                )}
                <button>
                    🛒
                </button>
            </div>
        </div>
    )
}

export default StoreItem;