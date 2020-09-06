import { ConcatReversed, Concat } from "utils";

type TupleA = ["a", "b", "c"];
type TupleB = ["d", "e", "f"];

type AssertConcatReversed = ConcatReversed<TupleA, TupleB>;
let assertConcatReverse: AssertConcatReversed;
assertConcatReverse = ["c", "b", "a", "d", "e", "f"];
assertConcatReverse;

type AssertConcat = Concat<TupleA, TupleB>;
let assertConcat: AssertConcat;
assertConcat = ["a", "b", "c", "d", "e", "f"];
assertConcat;
