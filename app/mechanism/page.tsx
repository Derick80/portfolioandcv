import MechanismChatBox from './chatbox'
import { getAllGeneMechanisms } from './mechanism';

export default async function MechanismPage() {
    const mechanisms = await getAllGeneMechanisms();
    console.log('Fetched mechanisms:', mechanisms);
    return <div>
    <h1 className="text-2xl font-bold mb-4">Mechanism of Action Search</h1>
    <div className="border p-4 rounded shadow">
       
        <MechanismChatBox />
        </div>

    </div>

}