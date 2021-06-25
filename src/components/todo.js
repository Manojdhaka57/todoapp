import React ,{useState}from 'react';
import todo from '../images/todo.svg';


const Todo=()=> {
    const [inputData , setInputData]=useState('');
    const [items ,setItems]=useState([]);
    const [toggleSubmit, setToggleSubmit]= useState(true);
    const [isEditItem, setIsEditItem]=useState(null);
    const addItem=()=>{
        if(!inputData){
          alert("please fill data")

        }
        else if(inputData && !toggleSubmit){
          setItems(
            items.map((elem)=>{
              if(elem.id===isEditItem){
                return {...elem, name:inputData};
              }
              return elem;
            })
            
            
          )
          setToggleSubmit(true);
          setInputData('');
          setIsEditItem(null);
        }
        else{
          const allInputData= {id: new Date().getTime().toString(), name:inputData};
            setItems([allInputData,...items]);
            setInputData("");
        }
        
    }
    const deleteitem=(index)=>{
        const updateItem= items.filter((elem)=>{
            return elem.id!==index;
        });
        setItems(updateItem)
    }
    const removeAll=()=>{
        setItems([]);
    }
    const edititem=(id)=>{
      let newEditItem = items.find((elem)=>{
        return elem.id===id;
      });
      setToggleSubmit(false);
      setInputData(newEditItem.name);
      setIsEditItem(id);
    }
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todo} alt="todologo"></img>
            <figcaption>Add Your List Here ✍️ </figcaption>
          </figure>
          <div className="addItems">
            <input type="text" 
                value={inputData}
                onChange={(e)=>setInputData(e.target.value)}
                placeholder=" ✍️ add item....."/>
                {
                  toggleSubmit?<i className="fa fa-plus add-btn" title="add item" onClick={addItem}></i>:
                  <i className="far fa-edit addbtn" title="update item" onClick={addItem}></i>
                }
          </div>
          <div className="showItems">
            {
                items.map((elem)=>{
                    return (
                        <div className="eachItem" key={elem.id}>
                            <h3>{elem.name}</h3>
                            <div className="todo-btn">
                              <i className="far fa-edit addbtn" title="edit Item" onClick={()=>edititem(elem.id)}></i>
                              <i className="far fa-trash-alt addbtn" title="Delete Item" onClick={()=>deleteitem(elem.id)}></i>
                            </div>
                        </div>
                        )
                })      
            }
            <div className="showItems">
                <button className="btn effect04" data-sm-link-text="REMOVE ALL" onClick={removeAll }><span>CHECK LIST</span></button>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;