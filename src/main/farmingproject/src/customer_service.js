import './customer_service.css';
import './common/root.css'

function CustomerService(){
    return(
        <div className={"body"}>
            <div id={'customer_service_page'} className={'page'}>
                <div id={'contents'}>
                    <div className={'service_qna'}>
                        무엇을 도와드릴까요 ?
                    </div>
                    <div className={'service_container'}>
                        <div className={'service_container_title'}>
                            고객센터
                        </div>
                        <div className={'question_box'}>
                            자주 묻는 검색                        </div>
                    </div>
                </div>

            </div>

        </div>

    );
}
export default CustomerService;