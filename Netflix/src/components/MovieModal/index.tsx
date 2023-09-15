import React, {useRef} from 'react';
import {Movie} from "../Banner";
import "./MovieModal.css"
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface MovieModalProp extends Movie{
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MovieModal(modal: MovieModalProp) {


    const ref = useRef<HTMLDivElement>(null)

    useOnClickOutside(ref, () => { modal.setModalOpen(false) })

    return (
        <div className="presentation">
            <div className="wrapper-modal">
                <div className="modal" ref={ref}>
          <span onClick={() => modal.setModalOpen(false)} className="modal-close">
            X
          </span>

                    <img
                        className="modal__poster-img"
                        src={`https://image.tmdb.org/t/p/original/${modal.backdrop_path}`}
                        alt="modal__poster-img"
                    />

                    <div className="modal__content">
                        <p className="modal__details">
                            <span className="modal__user_perc">100% for you</span>{" "}
                            {modal.release_date ? modal.release_date : modal.first_air_date}
                        </p>

                        <h2 className="modal__title">{modal.title ? modal.title : modal.name}</h2>
                        <p className="modal__overview"> 평점: {modal.vote_average}</p>
                        <p className="modal__overview"> {modal.overview}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
 