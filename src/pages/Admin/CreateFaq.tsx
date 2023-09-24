import FAQ from "../../components/Admin/FAQ";
import {getDummyFaq} from "../../entities/faq";

const CreateFaq = () => {

    return (
        <FAQ isEdit={false} faqData={getDummyFaq()}/>
    )

}

export default CreateFaq;
