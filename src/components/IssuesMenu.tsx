import cx from "classnames";
import styles from "./IssueMenu.module.css";

type Props = {
	open: boolean
	setOpen: (open: boolean) => void
}
const IssuesMenu = ({ open, setOpen }: Props) => {
	const closeMenu = () => setOpen(false)

	const menuClasses = cx(styles.container, {
		[styles.open]: open,
	})

	const overlayClasses = cx(styles.overlay, {
		[styles.open]: open,
	})

	return <div>
		<div className={overlayClasses} onClick={closeMenu} />

		<div className={menuClasses}>
			<h1>Hello</h1>
		</div>
	</div>
}

export default IssuesMenu
