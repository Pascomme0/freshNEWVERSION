import { SafeAreaView } from "react-native-safe-area-context";
import Entete from "../../components/Entete";
import Categories from '../../components/Categories'
import { ScrollView } from "react-native";
import Images from "../../components/Images";
import ProductList from "../../components/ProductList";

export default function Index() {

  return (
    <ScrollView className='px-2' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
    <SafeAreaView className="flex-1 bg-white">
     <Entete />
       <Categories/>
       <Images/>
       <ProductList/>
  </SafeAreaView>
  </ScrollView>
  );
}
