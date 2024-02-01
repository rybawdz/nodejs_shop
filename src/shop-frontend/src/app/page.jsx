import NavBar from './components/navbar';
import StoreItem from './components/storeItem';
import StoreItemList from './components/storeItemList';
import getItems from './lib/getItems';
import './styles/main.css';

// Czy tylko ja mam glitcha, że jak wracam z login/signup 
// do głownej strony to wszystko się retarduje? (jak się przeładuje stronę to wraca do normy)
// Ja tez tak mam :/ nwm czemu tak jest

export default async function Home() {
  const items = await getItems()
  return (
    <div>
      <NavBar />
      <div className='content'>
        <marquee>
          { }
          <h1>Hello, home page!</h1>
        </marquee>
        {/* add photo request handling to routing */}
        <StoreItemList items={items} />
      </div>
    </div>
  );
}




