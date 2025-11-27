
const POINT_SCALE = {
    PATHOGENIC:{
        "indeterminate": 0,
        "supporting": 1,
        "moderate": 2,
        "strong": 4,
        "very_strong": 8
    },
    BENIGN:{
        "indeterminate": 0,
        "supporting": -1,
        "moderate": -2,
        "strong": -4,
        "very_strong": -8
    }
}




export default async function Page(
    
) {
    return <div>ACMG Page</div>;
    }