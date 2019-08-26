import {resources} from './resources';
import {refiner} from './refiner';

const craftables=[
    "Glass","Nanite Clusters","Di-hydrogen Jelly","Viscous Fluid"
]

export const list=()=>{
   return {resources,refiner,craftables}
}