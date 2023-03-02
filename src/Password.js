import { useState } from 'react'

function Password() {
    function randomCharacter() {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
        const symbols = ['_', '.']
        const choices = letters.concat(numbers, symbols)
        return choices[Math.floor(Math.random() * choices.length)]
    }

    const [password, setPassword] = useState('p@$$w0rd')
    const [passName, setPassName] = useState('')
    const [description, setDescription] = useState('')

    function generatePassword() {
        const password = []
        for(let i = 0; i < 8; i++){
            password.push(randomCharacter())
        }
        setPassword(password.join("").toString())
      
    }

    return (
        <div>
            <input 
                type="text"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                />
            <div> 
            <button 
            onClick={(e) => {generatePassword()}}>
            Generate</button>
            </div>
            <input 
                type="name"
                placeholder="add a name"
                onChange={(e) => setPassName(e.target.value)}
                value={passName}
                />
            <input 
                type="description"
                placeholder="add a desc"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                />
        </div>
        )
       }

export default Password