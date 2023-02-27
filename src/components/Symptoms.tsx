import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Liked } from '../assets/icons/liked.svg'
import { changeIndicator, selectSymptom, SymptomItemType } from '../redux/slices/symptomSlice'
const Symptoms:React.FC = () => {
  const dispatch = useDispatch()
    const {symptoms} = useSelector(selectSymptom)
    const fillLiked = (ItemMark:number, idMarkClick:number) =>{
        if(ItemMark >= idMarkClick){
          return '#f00'
        }
    }
    const onChangeIndicator = (item:SymptomItemType,idLike:number) => {
      dispatch(changeIndicator({
        item,
        idLike
      }))
    }
  return (
    <div className='symptoms'>
        {symptoms.map((item:SymptomItemType, index:number) => {
            return (
                <div className='symptoms--item' key={index}>
                  <span className='symptoms--item__title'>
                    {item.name}: 
                  </span>
                  <div className='symptoms--item__healths'>
                    {[...new Array(10)].map((_,mark) => <Liked key={mark} fill={fillLiked(item.mark,mark)} onClick={() => onChangeIndicator(item, mark)} className='health'/>)}
                  </div>
                </div>
            )
        })
        }
    </div>
  )
}

export default Symptoms