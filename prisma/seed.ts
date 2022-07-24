import prisma from './../src/config/database.js';

async function main() {
 
  const terms = await prisma.terms.findMany();
  if (terms.length === 0) {
    await prisma.terms.createMany( 
      { data: [{number: 1}, {number: 2}, {number: 3}, {number: 4}, {number: 5}, {number: 6}]} 
    );
  }

  const categories = await prisma.categories.findMany();
  if (categories.length === 0) {
    await prisma.categories.createMany( 
      { data: [{name: 'Projeto'}, {name: 'Prática'},{name: 'Recuperação'} ]} 
    );
  }

  const teachers = await prisma.teachers.findMany();
  if (teachers.length === 0) {
    await prisma.teachers.createMany( 
      { data: [{name: 'Diego Pinho'}, {name: 'Bruna Hamori'}]} 
    );
  }

  const disciplines = await prisma.disciplines.findMany();
  if (disciplines.length === 0) {
    await prisma.disciplines.createMany( 
      { data: [{name: 'HTML e CSS', termId: 1}, {name: 'JavaScript'  , termId: 2}, {name: 'React', termId: 3},
               {name: 'Humildade' , termId: 1}, {name: 'Planejamento', termId: 2}, {name: 'Autoconfiança', termId: 3}]} 
    );
  }

  const teachersDisciplines = await prisma.teachersDisciplines.findMany();
  if (teachersDisciplines.length === 0) {
    await prisma.teachersDisciplines.createMany( 
      { data: [ {teacherId: 1, disciplineId: 1}, {teacherId: 1, disciplineId: 2},{teacherId: 1, disciplineId: 3},
                {teacherId: 2, disciplineId: 4}, {teacherId: 2, disciplineId: 5},{teacherId: 2, disciplineId: 6}]} 
    );
  }

}

main().catch(e => {
  console.log(e); 
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
})