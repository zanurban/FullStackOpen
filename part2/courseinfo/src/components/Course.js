import React from 'react'

const Course = ({ course }) => {
    return (
      <>
        <Courses course={course}/>
      </>
    );
};

const Courses = ({ course }) => {
    return (
      <>
        {course.map((c)=>(<><h1 key={c.id}>{c.name}</h1><Content course={c}/><Total course={c}/></>))}
      </>
    );
};

const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
};

const Content = ({ course }) => {
    return (
      <div>
        {course.parts.map((c) => 
          <Part part={c} />
        )}
      </div>
    );
};

const Total = ({ course }) => {
    let total = 0;
      total += course.parts.reduce((accum, part) => accum + part.exercises, 0);
    return (
      <p><b>
        Number of exercises {total}
      </b></p>
    );
};

export default Course;
