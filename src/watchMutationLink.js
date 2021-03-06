// import WatchedMutationLink from "apollo-link-watched-mutation";
// import produce from "immer";

const createEdge = (node, typename) => ({ node, __typename: typename });

export default (cache) => {};
//   new WatchedMutationLink(cache, {
//     createDutyMutation: {
//       dutiesQuery: ({ mutation, query }) => {
//         console.log(mutation, query);
//         try {
//           const newDutyEdge = createEdge(
//             mutation.result.data.createDuty.duty,
//             "DutyEdge"
//           );
//           return produce(query.result, (draftResult) => {
//             draftResult.duties.edges.push(newDutyEdge);
//           });
//         } catch (e) {
//           console.error(e);
//           return query.result;
//         }
//       },
//     },
//     deleteLandDutyMutation: {
//       landDetailsQuery: ({ mutation, query }) => {
//         try {
//           return produce(query.result, (draftResult) => {
//             draftResult.land.landDuties.edges.filter(
//               (e) => e.id === mutation.variables.input.landDutyId
//             );
//           });
//         } catch (e) {
//           console.error(e);
//           return query.result;
//         }
//       },
//     },
// createCompletedDutyMutation: {
//   landDetailsQuery: ({ mutation, query }) => {
//     try {
//       const newULDEdge = createEdge(
//         mutation.result.data.createCompletedDuty.completedDuty,
//         "completedDutyEdge"
//       );
//       return produce(query.result, draftResult => {
//         const landDutyId = mutation.variables.input.landDutyId;
//         draftResult.land.landDuties.edges
//           .find(e => e.node.id === landDutyId)
//           .node.completedDuties.edges.push(newULDEdge);
//       });
//     } catch (e) {
//       console.error(e);
//       return query.result;
//     }
//   }
// },
// DeleteCompletedDutyMutation: {
//   landDetailsQuery: ({ mutation, query }) => {
//     try {
//       return produce(query.result, draftResult => {
//         // TODO: This is super not performant and terrible
//         // If there is more than one in each completedDuties this will fail
//         // it needs to be scoped to 24 hours on the query.reslt to be 24 hours or
//         // whatever length until the next duty is due
//         const landDutyId =
//           mutation.result.data.deleteCompletedDuty.completedDuty.landDuty
//         .id;
//     draftResult.land.landDuties.edges.forEach(e =>
//       draftResult.land.landDuties.edges
//         .find(e => e.node.id === landDutyId)
//         .node.completedDuties.edges.splice(0)
//     );
//   });
// } catch (e) {
//   console.error(e);
//   return query.result;
//     }
//   }
// }
//   });
