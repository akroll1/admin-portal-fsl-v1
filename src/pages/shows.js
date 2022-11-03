import {useState, useEffect} from 'react'
import { Flex, useToast } from '@chakra-ui/react'
import { ShowsSidebar } from '../components/sidebars'
import { removeBadEmails, isValidEmail } from '../utils'
import { ShowsMain } from '../components/shows'
import { ExpiredTokenModal, ReviewFormModal } from '../components/modals'
import { useScorecardStore } from '../stores'
import { useNavigate } from 'react-router'

const Shows = () => {
    const toast = useToast();
    const navigate = useNavigate()
    const { 
        createGroupScorecard,
        fetchAllSeasons,
        putUserFightReview,
        selectedFightSummary, 
        setModals,
        setTokenExpired,
        tokenExpired,
        user,
        userFightReview,
     } = useScorecardStore();
    const { email, sub, username } = user;
    const [seasonName, setSeasonName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fightReviewForm, setFightReviewForm] = useState(false);
    const [emailValue, setEmailValue] = useState('');
    const [groupScorecard, setGroupScorecard] = useState({
        admin: email, // human readable form.
        fightId: '',
        fighterIds: [], // for scorecards creation.
        groupScorecardName: '',
        members: [email],
        ownerId: sub,
        rounds: 0, // for scorecards creation.
        showId: '',
        username, // for email invites && scorecards username.
    });
    const [reviewForm, setReviewForm] = useState({
        reviewId: null,
        rating: 0,
        review: '',
        title: ''
    });

    useEffect(() => {
        if(tokenExpired){
            setTokenExpired(true)
            setModals('expiredTokenModal', true)
        }
    },[tokenExpired])

    useEffect(() => {
        fetchAllSeasons()
    },[])

    useEffect(() => {
        if(userFightReview){
            setReviewForm(userFightReview)
        }
    },[userFightReview]);
    
    const handleReviewFormSubmit = async () => {
        const putObj = Object.assign(reviewForm, {
            ownerId: sub,
            showId: selectedFightSummary.show.showId,
            fightId: selectedFightSummary.fight.fightId,
            username
        });

        const success = await putUserFightReview(putObj);
        if(success){
            toast({ 
                title: 'Review Submitted!',
                duration: 5000,
                status: 'success',
                isClosable: true
            });
            handleReviewFormClose()
        }
    }

    const handleEmailSubmit = e => {
        e.preventDefault();
        if(isValidEmail(emailValue)){
            const { members } = groupScorecard;
            const tempMembers = members.concat(emailValue);
            setGroupScorecard({...groupScorecard, members: tempMembers});
            setEmailValue('');
        } else {
            alert('Not a valid email.')
        }
    }
    const deleteMember = e => {
        const { id } = e.currentTarget;
        const { members } = groupScorecard;
        const tempMembersArr = members.filter( member => member !== id)
        return setGroupScorecard({...groupScorecard, members: tempMembersArr});
    }

    const handleFormChange = e => {
        const { id, value, checked } = e.currentTarget;
        if(id === 'reminders') return setGroupScorecard({...groupScorecard, reminders: checked})
        if(id === 'emailValue') return setEmailValue(value);
    };
    // 1. Close review form.
    const handleReviewFormClose = () => {
        setReviewForm({
            reviewId: null,
            title: '',
            rating: 0,
            review: ''
        });
        setFightReviewForm(false);
    }

    const handleCreateGroupScorecard = async () => {
        // this can be pushed down to zustand.
        setIsSubmitting(true);
        const tempMembersArr = members.concat(email);
        const goodEmails = removeBadEmails(tempMembersArr);
        const dedupedEmails = [...new Set(goodEmails)];

        const scorecardObj = {
            fighterIds: [selectedFightSummary.fighters[0].fighterId, selectedFightSummary.fighters[1].fighterId],
            fightId: selectedFightSummary.fight.fightId,
            groupScorecardName: selectedFightSummary.fight.fightQuickTitle,
            members: dedupedEmails,
            ownerId: sub,
            rounds: selectedFightSummary.fight.rounds,
            showId: selectedFightSummary.show.showId,
        };
        const created = await createGroupScorecard(scorecardObj);
        if(created){
            toast({ 
                title: 'Group Created!',
                duration: 5000,
                status: 'success',
                isClosable: true
            })
            setTimeout(() => {
                navigate('/scorecards')
            },3000)
        }
        setIsSubmitting(false);        
    };
    const { members } = groupScorecard;

    return (
        <Flex 
            w={["100%"]} 
            m="auto"
            flexWrap="wrap" 
            height="auto" 
            flexDirection={["column",'column','row']} 
            color="white" 
            alignItems="flex-start" 
            justifyContent="center" 
        >    
            <ExpiredTokenModal />
            
            { fightReviewForm && 
                <ReviewFormModal
                    reviewForm={reviewForm}
                    setReviewForm={setReviewForm}
                    handleReviewFormSubmit={handleReviewFormSubmit}
                    handleReviewFormClose={handleReviewFormClose}
                />
            }

            <ShowsSidebar
                setSeasonName={setSeasonName}
            />  
            
            <ShowsMain 
                deleteMember={deleteMember}
                emailValue={emailValue}
                fightReviewForm={fightReviewForm}
                handleCreateGroupScorecard={handleCreateGroupScorecard}
                handleEmailSubmit={handleEmailSubmit}
                handleFormChange={handleFormChange}
                isSubmitting={isSubmitting}
                members={members}
                seasonName={seasonName}
                setFightReviewForm={setFightReviewForm}
            />
           
        </Flex>
    )
}
export default Shows