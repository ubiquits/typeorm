import {Category} from "./Category";
import {ManyToMany} from "../../../../../src/decorator/relations/ManyToMany";
import {Table} from "../../../../../src/decorator/tables/Table";
import {PrimaryColumn} from "../../../../../src/decorator/columns/PrimaryColumn";
import {Column} from "../../../../../src/decorator/columns/Column";
import {Tag} from "./Tag";
import {ManyToOne} from "../../../../../src/decorator/relations/ManyToOne";
import {RelationId} from "../../../../../src/decorator/relations/RelationId";
import {JoinTable} from "../../../../../src/decorator/relations/JoinTable";
import {RelationCount} from "../../../../../src/decorator/relations/RelationCount";

@Table()
export class Post {

    @PrimaryColumn("int", { generated: true })
    id: number;

    @Column()
    title: string;
    
    @ManyToOne(type => Tag)
    tag: Tag;

    @ManyToMany(type => Category)
    @JoinTable()
    categories: Category[];
    
    @RelationCount((post: Post) => post.categories)
    categoriesCount: number;
    
    secondCategoriesCount: number;

}